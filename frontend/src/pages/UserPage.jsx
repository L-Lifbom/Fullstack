import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import style from "../index.module.css";

function UserPage() {
    return (
        <>
            <Nav />
            <div className={style.userMainContainer}>
                <h1>User Page</h1>
            </div>
            <Footer />
        </>
    );
}

export default UserPage;


