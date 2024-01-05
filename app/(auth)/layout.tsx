// layout for the sign-in and sign-up page
const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex-center min-h-screen w-full bg-primary-200 bg-dotted-pattern bg-cover bg-fixed bg-center">
			{children}
		</div>
	);
};

export default Layout;
