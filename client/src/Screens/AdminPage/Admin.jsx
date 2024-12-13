import AdminHeadSection from "../../Components/AdminComponents/AdminHeadSection/AdminHeadSection.jsx";
import AdminMiddleSection from "../../Components/AdminComponents/AdminMiddleSection/AdminMiddleSection.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import AdminNavBar from "../../Components/AdminComponents/AdminNavBar/AdminNavBar.jsx";


function admin() {
    return (
        <div className="admin">
            <AdminNavBar/>
            <AdminHeadSection/>
            {/*<AdminMiddleSection/>*/}
            <Footer/>
        </div>
    )
}

export default admin;