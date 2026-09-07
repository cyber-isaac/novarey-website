export async function submitBrief(formData, send = fetch) {
    const body = new URLSearchParams(formData);
    body.set('form-name', 'project-inquiry');
    const response = await send('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
    });
    if (!response.ok) throw new Error('Your brief could not be submitted.');
    // A static preview may return the app shell for POSTs without saving anything.
    const result = await response.text();
    if (/id=["']root["']/.test(result)) throw new Error('Form submission is unavailable.');
}
