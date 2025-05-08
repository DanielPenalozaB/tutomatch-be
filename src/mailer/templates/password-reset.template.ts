export const passwordResetEmail = (name: string, resetLink: string) => ({
  subject: 'Recuperación de contraseña',
  html: `
    <div style="margin:0;padding:0;background-color:#fff;color:#000000">
      <table id="m_5762863149704133945u_body" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;min-width:320px;Margin:0 auto;background-color:#fff;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align:top">
            <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
              <div class="m_5762863149704133945u-row-container" style="padding:0px;background-color:transparent">
                <div class="m_5762863149704133945u-row" style="margin:0 auto;min-width:320px;max-width:500px;word-wrap:break-word;word-break:break-word;background-color:transparent">
                  <div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
                    <div class="m_5762863149704133945u-col m_5762863149704133945u-col-100" style="max-width:320px;min-width:500px;display:table-cell;vertical-align:top">
                      <div style="height:100%;width:100%!important;border-radius:0px">
                        <div style="box-sizing:border-box;height:100%;padding:0px;border-top:0px solid transparent;border-left:0px solid transparent;border-right:0px solid transparent;border-bottom:0px solid transparent;border-radius:0px">
                          <table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left">
                                  <h1 style="margin:0px;line-height:140%;text-align:left;word-wrap:break-word;font-size:22px;font-weight:400">
                                    <span>Hola, ${name}</span>
                                  </h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="m_5762863149704133945u-row-container" style="padding:0px;background-color:transparent">
                <div class="m_5762863149704133945u-row" style="margin:0 auto;min-width:320px;max-width:500px;word-wrap:break-word;word-break:break-word;background-color:transparent">
                  <div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
                    <div class="m_5762863149704133945u-col m_5762863149704133945u-col-100" style="max-width:320px;min-width:500px;display:table-cell;vertical-align:top">
                      <div style="height:100%;width:100%!important;border-radius:0px">
                        <div style="box-sizing:border-box;height:100%;padding:0px;border-top:0px solid transparent;border-left:0px solid transparent;border-right:0px solid transparent;border-bottom:0px solid transparent;border-radius:0px">
                          <span class="im">
                            <table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left">
                                    <div style="font-size:14px;line-height:140%;text-align:left;word-wrap:break-word">
                                      <p style="line-height:140%">Hemos recibido una solicitud para restablecer tu contraseña en <strong>TutoMatch.</strong></p>
                                      <p style="line-height:140%">Por favor haz clic en el siguiente enlace para continuar:</p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </span>
                          <table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left">
                                  <div align="center">
                                      <a href="${resetLink}" style="box-sizing:border-box;display:inline-block;text-decoration:none;text-align:center;color:#ffffff;background-color:#3aaee0;border-radius:4px;width:auto;max-width:100%;word-break:break-word;word-wrap:break-word;font-size:14px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://Test_ResetLink&amp;source=gmail&amp;ust=1746711211515000&amp;usg=AOvVaw0xxYaZ4HeGOql_0sayRGSC">
                                        <span style="display:block;padding:10px 20px;line-height:120%"><span style="line-height:16.8px">Restablecer contraseña</span></span>
                                      </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <span class="im">
                            <table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left">
                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;border-top:1px solid #bbbbbb">
                                      <tbody>
                                        <tr style="vertical-align:top">
                                          <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0px;line-height:0px">
                                            <span>&nbsp;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left">
                                    <div style="font-size:14px;line-height:140%;text-align:left;word-wrap:break-word">
                                      <p style="line-height:140%">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
                                      <p style="line-height:140%">El enlace expirará en 1 hora.</p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-break:break-word;padding:40px 10px 24px;font-family:arial,helvetica,sans-serif" align="left">
                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;border-top:1px solid #e0dfdf">
                                      <tbody>
                                        <tr style="vertical-align:top">
                                          <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0px;line-height:0px">
                                            <span>&nbsp;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </span>
                          <table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif" align="left">
                                  <div style="font-family:helvetica,sans-serif;font-size:13px;line-height:140%;text-align:center;word-wrap:break-word">
                                    <p style="line-height:140%">
                                      <span style="color:#8b949f;line-height:18.2px">© TutoMatch</span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
    text: `Hola ${name},\n\nPor favor visita este enlace para restablecer tu contraseña:\n${resetLink}\n\nEl enlace expirará en 1 hora.`
});