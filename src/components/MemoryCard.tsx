import type { Card } from "../types"

function MemoryCard({ name, url, onClick }: Card ) {
    return (
        <>
            <div onClick = {onClick}>
                <h2>{name}</h2>
            </div>
        </>
    )
}
export default MemoryCard