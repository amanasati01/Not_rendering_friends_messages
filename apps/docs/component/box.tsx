type  propType = {
    heading : string,
    info : string
}
export default function Box({heading,info}:propType){
    return (
        <div className="flex  justify-start">
            <div className="">{heading}: </div>
            <div className="ml-2">{info}</div>
        </div>
    )
}