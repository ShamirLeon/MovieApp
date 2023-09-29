interface Props{
    width: number,
    heigth: number,
    top:number,
    left:number,
}

export default function Ligth(params:Props) {
    const {width, heigth, top, left} = params;
    return(
        <div style={{width:`${width}px`, height:`${heigth}px`, top:`${top}px`, left:`${left}px`}} className="Ligth"></div>
    )
}