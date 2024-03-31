export function Button({ label, onClick}) { 
    return <button onClick={onClick} type="button" className="w-full text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
}