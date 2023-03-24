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

type messagesType = {
    role: string
    content: string
}[]

export function App() {
    const [data, setData] = useState<unknown>(dataset)
    const [results, setResults] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messages: messagesType = []

    const handleClick = (query: keyof typeof queries) => {
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
            <h1 class="text-5xl">MIKO vs AI</h1>
            <div class="grid gap-8">
                <pre>
                    <code>
                        <textarea
                            onChange={(e) => {
                                setData((e.target as HTMLTextAreaElement).value)
                            }}
                        >
                            {JSON.stringify(data, null, 4)}
                        </textarea>
                    </code>
                </pre>
                <button
                    class="rounded-lg border border-indigo-700 py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => handleClick('llc')}
                    disabled={isLoading}
                >
                    Count LLC
                </button>
                <button
                    class="rounded-lg border border-indigo-700 py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => handleClick('usa')}
                    disabled={isLoading}
                >
                    USA
                </button>
                <textarea>{isLoading ? 'Loading...' : results}</textarea>
                <small>
                    Powered by <code>chatGPT</code>
                </small>
            </div>
        </div>
    )
}
