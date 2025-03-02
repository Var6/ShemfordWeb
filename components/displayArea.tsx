 interface DisplayToBe{
    Text:string,
    children:React.ReactNode,

 }
 const DisplayArea = ({Text, children}:DisplayToBe)=>{
    return(
        <div className="Flex flex-row justify-center">
            <div className="semi-bold text-clip sm:text-l md:text-xl  lg:text-3xl text-center sm:text-justify bg-gradient-to-br from-orange-700 to-yellow-400 bg-clip-text text-transparent">{Text}</div>
            {children}
        </div>
    )
}
export default DisplayArea