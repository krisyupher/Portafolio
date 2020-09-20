import React from 'react';
import "../styles/components/Terminal.scss";
const Termianal = () => {
	return (
		<div className="TerminalContainer">
			<div className="HeaderTerminal">
				<div>
					<p>PROBLEMS</p>
					<p>OUTPUT</p>
					<p>TERMINAL</p>
					<p>DEBUG CONSOLE</p>
				</div>
				<div>
					<p>+</p>
					<p>"[][]"</p>
					<p>`$`</p>
					<p>^</p>
					<p>x</p>
				</div>
			</div>
			<div>
				Line
			</div>
		</div>
	);
};

export default Termianal;