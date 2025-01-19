import React from 'react'

export default function PowerLogo({className, onClick}: {className: string, onClick: () => void}) {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    //   <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
    // </svg>
    <svg className={className} onClick={onClick} fill="currentColor" height="105px" width="105px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 207.868 207.868" xmlSpace="preserve">
    <path d="M39.608,107.806c0,35.47,28.857,64.326,64.327,64.326c35.469,0,64.325-28.856,64.325-64.326
    c0-22.881-12.319-44.229-32.149-55.712l17.909-30.926c30.827,17.853,49.976,51.05,49.976,86.638
    c0,55.175-44.887,100.062-100.062,100.062c-55.175,0-100.063-44.888-100.063-100.062c0-35.587,19.149-68.784,49.976-86.638
    l17.91,30.926C51.927,63.578,39.608,84.926,39.608,107.806z M121.804,0H86.066v110.189h35.737V0z"/>
    </svg>

  )
}
