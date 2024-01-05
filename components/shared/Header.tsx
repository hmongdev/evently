import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import NavItems from './NavItems';
import RightNav from './RightNav';

const Header = () => {
	return (
		<header className="w-full border-b">
			<div className="wrapper flex items-center justify-between">
				<Link href="/" className="w-36">
					<Image
						src="/assets/images/logo.svg"
						alt="logo"
						width={128}
						height={38}
					/>
				</Link>
				{/* on medium+ screens, show the links in header */}
				<SignedIn>
					<nav className="md:flex-between hidden w-full max-w-xs">
						<NavItems />
					</nav>
				</SignedIn>

				<div className="flex w-32 justify-end gap-3">
					{/* UserButton shows up if user is signed in */}
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
						<RightNav />
					</SignedIn>

					<SignedOut>
						<Button
							asChild
							className="rounded-full"
							size="lg">
							<Link href="/sign-in">
								Login
							</Link>
						</Button>
					</SignedOut>
				</div>
			</div>
		</header>
	);
};

export default Header;
