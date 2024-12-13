import './AdminHeadSection.css'
import movieIcon from '../../../assets/Images/movieIcon.png'
import userIcon from '../../../assets/Images/userIcon.png'

function adminHeadSection(props){
    return(
        <div className="adminHeadSection">
            <h4>Movie Management</h4>
            <div className="row mainHead gap-4">
                <div className="left col-8">
                    <div className="totalMovie bgImage"><p>Total Movies {props.movies}</p></div>
                </div>
                <div className="right col-3">
                    <button> Movie Section <img className="ms-5" src={movieIcon} alt="plusSign"/></button>
                </div>
            </div>

            <h4>User Management</h4>
            <div className="row mainHead gap-4">
                <div className="left col-8">
                    <div className="totalUser bgImage"><p>Total Users {props.users}</p></div>
                </div>
                <div className="right col-3">
                    <button>User Section <img className="ms-5" src={userIcon} alt="plusSign"/></button>
                </div>
            </div>
        </div>
    )
}

export default adminHeadSection;