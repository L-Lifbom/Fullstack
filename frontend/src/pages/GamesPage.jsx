import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import style from "../index.module.css";

function GamesPage() {
    return (
        <>
            <Nav />
            <div className={style.gamesMainContainer}>
                {/* {library.map((game) => (
                    <div className={style.gameCard}>
                        <h1>{game.name}</h1>
                        <img src={game.background_image} alt={game.name} />
                    </div>
                ))} */}
            </div>
            <Footer />
        </>
    );
}

export default GamesPage;