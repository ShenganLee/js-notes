const execCommandCopy = (value) => {
    const input = document.createElement('input');

    input.setAttribute('value', value);
    input.setAttribute('readonly', 'readonly');
    input.style.setProperty('cssText', 'visibility: hidden;width: 0;height: 0;padding: 0;margin: 0;border: 0;outline: 0;')

    document.body.appendChild(input);

    input.focus()
    input.setSelectionRange(0, value ? value.length : 1)

    const result = document.execCommand('copy');

    document.body.removeChild(input);

    return result ? Promise.resolve() : Promise.reject()
}

const clipboardCopy = async (value) => {
    try {
       await window.navigator.clipboard.writeText(value)
       return Promise.resolve()
    } catch (error) {
        console.error('Failed to copy: ', error);
        return Promise.reject()
    }
}

const copy2clipboard = (value) => {
    if (window.navigator.clipboard) {
        return clipboardCopy(value)
    }

    return execCommandCopy(value)
}