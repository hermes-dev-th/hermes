export default function Button({ Text }) {
    
    const scrollToContact = () => {
      const section = document.getElementById("contact-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    return (
        <>
            
            <button className="flex items-center justify-center bg-black w-[8vw] h-[3vw] text-[1.2vw] rounded-[0.5vw] font-bold text-white duration-700 hover:bg-[#999999]"  onClick={() => scrollToContact()}>
                {Text}
            </button>

        </>
    )
}