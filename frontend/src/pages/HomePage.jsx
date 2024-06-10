import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import style from "../index.module.css";

function HomePage() {
    return (
        <>
            <Nav />
            <div className={style.homeMainContainer}>
                <h1>Welcome to <br/><span>The Library</span></h1>
                <input type="text" placeholder="Find your next game" />
            </div>
            <Footer />
        </>
    );
}

export default HomePage;

