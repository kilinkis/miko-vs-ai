import {useState} from 'preact/hooks'
import './app.css'

// maybe try https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold

const dataset = [
    {
        companyName: 'Acme LLC',
        country: 'United States',
    },
    {
        companyName: 'Apple llc',
        country: 'USA',
    },
    {
        companyName: 'Wayne industries',
        country: 'United States of America',
    },
    {
        companyName: 'Corona limited liability company',
        country: 'Germany',
    },
]

const queries = {
    llc: 'how many "llc" are there in the dataset (case insensitive)? Consider "limited liability company" as "llc".',
    usa: 'are there companies from germany in this dataset?.',
}

type Queries = keyof typeof queries

const queriesLabels: Record<string, string> = {
    llc: 'How many Limited Liability Companies found?',
    usa: 'Are there companies from USA in this dataset?',
}

type Messages = {
    role: string
    content: string
}[]

export function App() {
    const [data, setData] = useState<unknown>(dataset)
    const [results, setResults] = useState('Results will show here...')
    const [selectedQuery, setSelectedQuery] = useState<Queries | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const messages: Messages = []

    const handleClick = (query: Queries) => {
        console.log(messages)
        setIsLoading(true)

        messages.push({
            role: 'user',
            content: `${queries[query]}: \n ${JSON.stringify(data)}`,
        })
        console.log(data)

        // IRL, don't want to put the API in the client
        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.info(data)
                setResults(data.choices[0].message.content.trim())
                setIsLoading(false)
            })
    }

    return (
        <div class="grid gap-12">
            <h1 class="grid grid-flow-col justify-center gap-2 text-5xl">
                <span class="reverse">🥊</span>
                MIKO vs AI 🥊
            </h1>
            <div class="grid gap-8">
                <pre>
                    <code>
                        <textarea
                            rows={14}
                            onChange={(e) => {
                                setData((e.target as HTMLTextAreaElement).value)
                            }}
                        >
                            {JSON.stringify(data, null, 4)}
                        </textarea>
                    </code>
                </pre>
                <div class="grid gap-2 text-left">
                    <label htmlFor="location" class="text-sm font-medium">
                        Query
                    </label>
                    <div class="grid grid-flow-col gap-8">
                        <select
                            class="block w-full rounded-md border-0 py-2 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                                setSelectedQuery((e.target as HTMLSelectElement).value as Queries)
                            }
                        >
                            <option value="" disabled selected hidden>
                                Select one
                            </option>
                            {Object.entries(queries).map(([key]) => {
                                return (
                                    <option key={key} value={key}>
                                        {queriesLabels[key]}
                                    </option>
                                )
                            })}
                        </select>
                        <button
                            class="rounded-lg border border-indigo-700 py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={() =>
                                selectedQuery
                                    ? handleClick(selectedQuery)
                                    : setResults("You didn't select a query")
                            }
                            disabled={isLoading}
                        >
                            Run query
                        </button>
                    </div>
                </div>
                <textarea rows={4}>{isLoading ? 'Loading...' : results}</textarea>
                <small>
                    Powered by <code>chatGPT</code>
                </small>
            </div>
        </div>
    )
}
