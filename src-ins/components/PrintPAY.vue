<template>
	<div class="_pri _pri_pay">
		<div class="code">
			Ref No. 10002356
		</div>
		<div class="head">
			<div>{{ payor }}</div>
			<div class="ta-r">{{ toDate }}</div>
		</div>
		<div class="data">
			<div class="l" v-if="payees.length > 0">
				<div class="i" v-for="(p,i) in payees" :key="'pay_'+ i">
					<div>{{ p.name }}</div>
					<div class="ta-r">{{ p.value | currency }}</div>
				</div>
			</div>
			<div class="l" v-else>
			</div>
			<div class="k">
				<div></div>
				<div class="ta-r">{{ totalFees | currency }}</div>
			</div>
			<div class="m">
				{{ feesInWords.toUpperCase() }}
			</div>
		</div>
		<div class="foot">
			<div class="g">
				Received the amount stated above
			</div>
			<div class="h ta-r">
				{{ officer }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			payees: {
				type: Array,
				required: true
			},
			payor: {
				type: String,
				required: true
			},
			officer: {
				type: String,
				required: true
			}
		},
		data() {
			const t = new Date()
			const date = t.getFullYear() +'/'+ (t.getMonth()+1) +'/'+ t.getDate(),
					hh = t.getHours() < 10 ? "0"+ t.getHours() : t.getHours(),
					mm = t.getMinutes() < 10 ? "0"+ t.getMinutes() : t.getMinutes();
			return {
				toDate: date +' '+ hh +':'+ mm
			}
		},
		computed: {
			totalFees() {
				let total = 0;
				if (this.payees.length > 0)
					this.payees.forEach(p => { total += p.value; });
				return total;
			},
			feesInWords() {
				const a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '],
					b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

				const inWords = (num) => {
					if ((num = num.toString()).length > 9) return 'overflow';
					let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
					if (!n) return;
					var str = '';
					str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
					str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
					str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
					str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
					str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' pesos only ' : '';
					return str;
				}
				return inWords(this.totalFees);
			}
		}
	}
</script>

<style scoped>
</style>
