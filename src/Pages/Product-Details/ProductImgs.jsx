function ProductDetailsImgs({details}) {
return (
    <div className="images">
        <div className="big-image">
        <img id='big-img' src={details.images[0]} alt={details.title} />
        </div>
        <div className="small-images">
        {details.images.map((img,index) => {
            return(
                <img key={index} src={img} alt={details.title} onClick={() => {document.getElementById("big-img").src = img}} />
            )
        })}
        </div>
    </div>
)
}

export default ProductDetailsImgs