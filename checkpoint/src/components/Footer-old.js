import React from "react"
import '../../src/styles/footer.css';

function Footer() {

    return (
        <>
            <div className="wrapper">
                <footer>
                    <div className="content">
                        <div className="left box">
                            <div className="upper">
                                <div className="topic">About us</div>
                                <p>Checkpoint is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non iaculis metus. Morbi in quam velit. Donec vulputate erat et est luctus, vel placerat nulla vehicula.</p>
                            </div>
                            <div className="lower">
                                <div className="topic">Contact us</div>
                                <div className="phone">
                                    <a href="#"><i className="fas fa-phone-volume"></i>555-555-5555</a>
                                </div>
                                <div className="email">
                                    <a href="#"><i className="fas fa-envelope"></i>abc@gmail.com</a>
                                </div>
                            </div>
                        </div>
                        <div className="middle box">
                            <div className="topic">Our Services</div>
                            <div><a href="#">Ut libero augue, interdum nec iaculis commodo, bibendum quis mi. Morbi ante tortor, venenatis et ullamcorper eget, imperdiet et erat. Vestibulum sit amet interdum ipsum, non scelerisque eros. Nulla nec urna non nunc viverra pharetra ac ac elit. Sed sit amet tincidunt tortor.</a></div>
                        </div>
                        <div className="right box">
                            <div className="topic">Third column</div>
                            <p>Nam nec vestibulum ex, ac vehicula felis. Aenean luctus rhoncus sapien eu egestas. Mauris vehicula nibh vitae elit efficitur condimentum. Nullam at elit placerat, ultrices ipsum vitae, sollicitudin nisi. Praesent dictum dictum est non blandit. Praesent nec euismod velit. Aliquam ac congue lectus. Quisque vitae tempor orci. Suspendisse quis magna sed massa luctus tincidunt et et purus. Praesent sed mi sem.</p>
                        </div>
                        <div className="bottom">
                            <p>Copyright © 2021 <a href="https://github.com/Checkpointapp">Checkpoint</a></p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer;