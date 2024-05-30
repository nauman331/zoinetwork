import zoipdf from "../assets/zoinetwork.pdf"
import "../assets/stylesheets/zoipdf.css";

const Zoipdf = () => {
    return (
        <>
        <section className="pdf-section">
            <h1>OUR ROADMAP</h1>
            <object data={zoipdf} type="application/pdf" className="pdf">
            </object>
            </section>
        </>
    )
}

export default Zoipdf
