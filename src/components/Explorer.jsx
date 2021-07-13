import React from 'react';
import "../styles/components/Explorer.css"
const Explorer = ({ stateExplorer }) => {
	return (
		<div className="ContainerExplorer">
			Explorer
			<div>
				<ul>
					<li>a</li>
					<li>b</li>
					<li>c</li>
					<li>d</li>
					<li>e</li>
				</ul>
				<h4>Proyectos</h4>
				<ul>
					<li onClick={(e) => {
						stateExplorer("countriesflag")
					}}>
						countriesflag
					</li>
					<li onClick={(e) => {
						stateExplorer("Tres en raya")
					}}>
						Tres en raya
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Explorer;