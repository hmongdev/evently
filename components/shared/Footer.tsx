import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer>
			<div className="flex-center">
				<Link href="/">
					<Image
						src="/assets/images/logo.svg"
						alt="logo"
						width={128}
						height={38}
					/>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
