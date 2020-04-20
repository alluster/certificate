import React, { useEffect } from 'react';
import Layout from '../layouts/layout';
import Container from '../components/Container';
import { withRouter } from 'next/router';
import Certificate from '../components/Certificate';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

const Certification = (props) => {
	function reformatName(y){
		return y.replace('.', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
	}
	const name = reformatName(props.certification.username)
	
	useEffect(() => {
		console.log(props.router)
	}, []);
	return(
			<Layout 
				title={`This content was published by ${name}`}
				// description={router.query.id}
				
				route={props.router.asPath}
			>
			
				<Container>
					<Certificate cert={props.certification}/>
				</Container>
			</Layout>		
	)
}

Certification.propTypes = {
	router: PropTypes.any,
	certification: PropTypes.any
	
 };
 Certification.getInitialProps = async function(router) {
	const res = await fetch(`${process.env.AUTHO_RETURN_URL}/getcertification/${router.query.id}`)
	const data = await res.json()
	return {
		certification: data[0]
	}
  };
export default withRouter(Certification);
