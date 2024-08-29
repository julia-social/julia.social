var src_default = {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://julia.social",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    } else if (request.method === "POST") {
      const formData = await request.formData();
      const email = formData.get("email");
      try {
        await env.DB.prepare("INSERT INTO emails (email) VALUES (?)").bind(email).run();
        return new Response("Email address saved successfully.", {
          status: 200,
          headers: corsHeaders
        });
      } catch (error) {
        return new Response("Failed to save the email address.", {
          status: 500,
          headers: corsHeaders
        });
      }
    } else {
      return new Response("Please send a POST request with an email address.", {
        status: 400,
        headers: corsHeaders
      });
    }
  }
};
export {
  src_default as default
};
