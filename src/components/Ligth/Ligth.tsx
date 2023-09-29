interface Props{
    id:number,
}

export default function Ligth({id}:Props) {
    return(
        <div id={`Ligth${id}`} className="Ligth"></div>
    )
}