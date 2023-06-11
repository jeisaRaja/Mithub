export default function Login() {
	const googleAuth = () => {
		window.open(
			`${process.env.NEXT_PUBLIC_API_URL}/user/auth/google/`,
			"_self"
		);
	};
	return (
		<div className="w-full flex flex-col items-center justify-center pt-8">
			<button onClick={googleAuth} className="text-blue-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
				Sign In With Google
			</button>
		</div>

	);
}
