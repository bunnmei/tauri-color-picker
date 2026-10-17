// navigator.clipboard は https / localhost でしか使えないので、
// それ以外 (LAN の IP で開いたブラウザ版など) では古い execCommand で代用する
export async function copyText(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) throw new Error("execCommand('copy') failed");
}
