import 'src/styles/pages/home/cardCountrySkeleton.scss'

const CardCountrySkeleton = () => (
    <div className="card-country-skeleton column">
        <div className='skeleton-1 skeleton-box'>
        </div>
        <div className="row">
            <div className="skeleton-2 skeleton-box"></div>
            <div className="column">
                <div className="skeleton-3 skeleton-box"></div>
                <div className="skeleton-4 skeleton-box"></div>
                <div className="skeleton-5 skeleton-box"></div>
            </div>
        </div>
        <div className="row">
            <div className="skeleton-6 skeleton-box"></div>
            <div className="skeleton-7 skeleton-box"></div>
        </div>
    </div>
)

export default CardCountrySkeleton