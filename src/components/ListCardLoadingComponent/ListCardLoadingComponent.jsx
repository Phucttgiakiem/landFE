import CardsmallComponent from "../CardsmallComponent/CardsmallComponent"
export default function ListCardLoadingComponent({numberitem = 5}) {
    return (
        <>
            {
             Array(numberitem).fill(null).map((_, index) => (
                <div key={index}>
                    <CardsmallComponent loading={true} />
                </div>
                ))
            }
        </>
    )
}