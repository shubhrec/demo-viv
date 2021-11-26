import logo from '../images/Vertical_VivSoft Logo Final Version-01[1].png'

function HeaderSection() {
    // let logoStyle = {
    //     width:100px;
    // }
    return ( 
        <header >
            <span id="logo-holder">
            <img id="logo" src="https://static.wixstatic.com/media/dcecb8_8f9d1f76f79a4955adb967ccc30aa548~mv2.png/v1/fill/w_322,h_86,al_c,q_85,usm_0.66_1.00_0.01/Horizontal_White-01.webp" />
            </span>
            <span>
            <h1 id="site-name">VivSoft</h1>
            </span>
        </header>
     );
}

export default HeaderSection;