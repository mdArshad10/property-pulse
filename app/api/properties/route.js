export const GET = async (request) => {
  try {
    return new Response(JSON.stringify({ message: "welcome to nextjs" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "something want gone wrong" }),
      { status: 404 }
    );
  }
};
