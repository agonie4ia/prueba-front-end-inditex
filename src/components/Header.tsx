import React from "react";

// Interfaces
import { HeaderProps } from "./../model/interfaces";

const Header: React.FC<HeaderProps> = ({ onHeaderClick, loading }) => {
	// console.log(`\\src\\components\\Header.tsx Header() loading? ${loading}`);
	return (
		<header className="header">

			<div> 

				<span
					className="header-title-span"
					onClick={onHeaderClick}>Podcaster</span>

			</div>

			<div className="header-loading-indicator-container-div">
				{loading &&
          <div className="header-loading-indicator-div"></div>
				}
			</div>

		</header>
	);
};

export default Header;
