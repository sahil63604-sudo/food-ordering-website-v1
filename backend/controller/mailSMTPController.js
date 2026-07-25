const GmailSMTP = require("../config/mail");

const sendMail = async (to, fullName, state, date, time) => {
  try {
    let subject = "";
    let html = "";

   if (state === "Confirmed") {

      subject = "🎉 Reservation Confirmed - Hunger Town";

      html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;border:1px solid #eee;border-radius:12px">

        <h1 style="color:#16a34a;text-align:center;">
          🍽️ Reservation Confirmed
        </h1>

        <p>Hello <b>${fullName}</b>,</p>

        <p>
          Great news! Your reservation has been
          <span style="color:#16a34a;font-weight:bold;">
            Confirmed
          </span>.
        </p>

        <hr>

        <p><b>📅 Date:</b> ${date}</p>

        <p><b>🕒 Time:</b> ${time}</p>

        <hr>

        <p>
          We look forward to serving you.
        </p>

        <p>
          Thank you for choosing
          <b style="color:#ff8800;">Hunger Town</b> ❤️
        </p>

      </div>
      `;
    }

   else if (state === "Cancelled") {

      subject = "Reservation Cancelled - Hunger Town";

      html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;border:1px solid #eee;border-radius:12px">

        <h1 style="color:#dc2626;text-align:center;">
          ❌ Reservation Cancelled
        </h1>

        <p>Hello <b>${fullName}</b>,</p>

        <p>
          We regret to inform you that your reservation has been
          <span style="color:#dc2626;font-weight:bold;">
            Cancelled
          </span>.
        </p>

        <hr>

        <p><b>📅 Date:</b> ${new Date(date).toLocaleDateString('en-IN')}</p>

        <p><b>🕒 Time:</b> ${time}</p>

        <hr>

        <p>
          If you have any questions or would like to make a new reservation,
          please contact us.
        </p>

        <p>
          Thank you for choosing
          <b style="color:#ff8800;">Hunger Town</b>.
        </p>

      </div>
      `;

    }

    await GmailSMTP.sendMail({
      from: `"Hunger Town" <${process.env.USER}>`,
      to,
      subject,
      html,
    });

  } catch (error) {
    console.log("Error while sending mail:", error);
  }
};

module.exports = sendMail;