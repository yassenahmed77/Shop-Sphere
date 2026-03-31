function ProductDetailsLoading() {
    return (
        <div className="item-details">
            <div className="container">
                <div className="images">
                    <div className="big-image">
                        <div className="skeleton"></div>
                    </div>
                    <div className="small-images">
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                    </div>
                </div>
                <div className="details">
                    <div className="name skeleton"></div>
                    <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="skeleton"></div>
                        ))}
                    </div>
                    <div className="price skeleton"></div>
                    <h5><span className="skeleton"></span></h5>
                    <p className="desc skeleton"></p>
                    <p className="desc skeleton"></p>
                    <p className="desc skeleton"></p>
                    <h3 className="skeleton"></h3>
                    <a className="btn add skeleton"></a>
                    <div className="icons">
                        <span className="skeleton"></span>
                        <span className="skeleton"></span>
                        <span className="skeleton"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsLoading;