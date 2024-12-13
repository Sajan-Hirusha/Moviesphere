import './AdminMiddleSection.css'

function AdminMiddleSection() {
    return(
        <div className="adminMiddleSection">

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Inquery Id</th>
                    <th scope="col">Inquery</th>
                    <th scope="col"></th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AdminMiddleSection;