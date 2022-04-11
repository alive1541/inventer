var removeNthFromEnd = function (head, n) {
	const cache = []
	// 5 4 3 2 1
	let p = head
	while (p.next) {
		cache.unshift(p)
		p = p.next
	}
	console.log('cache ', cache);
	const pre = cache[n]
	if (n === 1) {
		cache[1].next = null
	} else if (n === cache.length) {
		return cache[cache.length - 2]
	} else {
		pre.next = cache[n - 2]
	}
	return head

};
function ListNode(val, next) {
	this.val = (val === undefined ? 0 : val)
	this.next = (next === undefined ? null : next)
}

const a1 = new ListNode(1)
const a2 = new ListNode(2)
const a3 = new ListNode(3)
const a4 = new ListNode(4)
const a5 = new ListNode(5)
a1.next = a2
a2.next = a3
a3.next = a4
a4.next = a5
removeNthFromEnd(a1, 2)