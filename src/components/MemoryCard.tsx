import type { Card } from "../types"

function MemoryCard({ name, url, onClick }: Card ) {
    return (
        <>
            <div className = "memory-card" onClick = {onClick}>
                <h2>{name}</h2>
                {url ? <img src = {url} alt = {name}/> : null}
            </div>
            
        </>
    )
}
export default MemoryCard