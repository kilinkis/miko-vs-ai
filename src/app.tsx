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
    const [results, setResults] = useState('')

    return (
        <div class="grid gap-12">
            <h1 class="text-5xl">MIKO vs AI</h1>
            <div class="grid gap-8">
                <button
                    class="border border-indigo-700 rounded-lg py-2 px-4"
                    onClick={() => setResults((results) => `${results} some results`)}
                >
                    Count LLC
                </button>
                <textarea>{results}</textarea>
                <small>
                    Powered by <code>chatGPT</code>
                </small>
            </div>
        </div>
    )
}
