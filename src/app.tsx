import {useState} from 'preact/hooks'
import './app.css'

const data = [
    {
        companyName: 'Acme LLC',
    },
    {
        companyName: 'Apple llc',
    },
    {
        companyName: 'Wayne industries',
    },
    {
        companyName: 'Pleo limited liability company',
    },
]

const queries = {
    llc: 'how many "llc" are there in the dataset (case insensitive)? I want a number. Consider "limited liability company" as "llc"',
}

export function App() {
    const [count, setCount] = useState(0)

    return (
        <div class="grid gap-12">
            <h1 class="text-5xl">MIKO vs AI</h1>
            <div>
                <button
                    class="border border-indigo-700 rounded-lg py-2 px-4"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </button>
                <p>
                    Edit <code>src/app.tsx</code> and save to test HMR
                </p>
            </div>
        </div>
    )
}
