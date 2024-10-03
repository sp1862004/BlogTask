import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand ms-5 blogt" href="#">SHAILESH BLOG</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link active " aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/Index'} className="nav-link active " aria-current="page" href="#">Write-Blog</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
