export default function Square({ player, onSquareClick }) {
    return (<>
    <button onClick={onSquareClick} className="border-2 flex justify-center items-center">{player}</button>
    </>)
}