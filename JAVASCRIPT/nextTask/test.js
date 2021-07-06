
function nextfunction(task, message, messages, last, i = 0) {
    task.next(() => {
        if (i === 10000) {
            console.log(message, messages[messages.length - 1].n - messages[0].l, messages)
            return
        }
        const now = performance.now()
        messages.push({i: i, t: now - last, l: last, n: now})
        nextfunction(task, message, messages, now, ++i)
    })
}

var timeoutTask = new TimeoutTask()
var timeoutStart = performance.now()
var timeoutMessages = []
nextfunction(timeoutTask, 'timeoutTask', timeoutMessages, timeoutStart, 0)

var messageTask = new MessageTask()
var messageStart = performance.now()
var messageMessages = []
nextfunction(messageTask, 'messageTask', messageMessages, messageStart, 0)

var mutationTask = new MutationTask()
var mutationStart = performance.now()
var mutationMessages = []
nextfunction(mutationTask, 'mutationTask', mutationMessages, mutationStart, 0)

var promiseTask = new PromiseTask()
var promiseStart = performance.now()
var promiseMessages = []
nextfunction(promiseTask, 'promiseTask', promiseMessages, promiseStart, 0)