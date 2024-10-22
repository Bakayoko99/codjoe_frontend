import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



// [#A77E5B]
const Buttons = ({ data, toLink }) => {

    const [active, setActive] = useState(true);
    const [active2, setActive2] = useState(false);
    const [btnData, setBtnData] = useState(data[0]);
    const [btnLink, setBtnLink] = useState(toLink);


    // useEffect(() => {
    //     console.log("btn data and link: ", data, toLink);
    // }, [data, toLink]);

    const oneButton = (btn, isActive, setActive1, setActive2, text1, text2, link, btnHeight) => (
        <Link
            to={link == undefined ? '' : link}
            onClick={() => {

                // console.log("data one btn", btnData);

                if (btn === 1) {

                    setActive1(true)
                    setActive2(false)

                } else if (btn === 2) {
                    setActive2(true)
                    setActive1(false)

                } else {
                    console.log("ok, no toggle", btn, text)
                }


            }}
            className={`w-[150px] ${btnHeight ? btnHeight : ' h-12'} ${isActive ? ' bg-codjoe-biscuit' : 'white'} text-${isActive ? 'white' : 'black'} rounded-[28.50px] m-1 flex justify-center items-center`}
        >

            {btn === 0 || btn === 1 ? text1 : text2}

        </Link>
    )


    return (
        <div>
            {
                btnData.type === 'toggle' ? (
                    <div className="flex w-fit bg-white rounded-[28.50px]">
                        {oneButton(1, active, setActive, setActive2, btnData.btn1.text, btnData.btn2.text, btnData.btn1.link, btnData.btn1.btnHeight)}
                        {oneButton(2, active2, setActive, setActive2, btnData.btn1.text, btnData.btn2.text, btnData.btn2.link, btnData.btn1.btnHeight)}
                    </div>
                ) : (
                    <div className="flex w-fit bg-white rounded-[28.50px]">
                        {oneButton(0, active, setActive, setActive2, btnData.btn1.text, btnData.btn2?.text, btnLink, btnData.btn1.btnHeight)}
                    </div>
                )
            }
        </div>
    );
}

export default Buttons;

// className={`w-[${w != undefined ? w : '150'}px] h-12 ${isActive ? ' bg-codjoe-biscuit' : 'white'} text-${isActive ? 'white' : 'black'} rounded-[28.50px] m-1 flex justify-center items-center`}


{/* <div>
{
    data.type === 'toggle' ? (
        <div className="flex w-fit bg-white rounded-[28.50px]">
            {oneButton(1, active, setActive, setActive2, text, text2, toProducts)}
            {oneButton(2, active2, setActive, setActive2, text, text2, toProducts)}
        </div>
    ) : (
        <div className="flex w-fit bg-white rounded-[28.50px]">
            {oneButton(0, active, setActive, setActive2, text, text2, toProducts)}
        </div>
    )

}
</div> */}