module.exports = {
	generate : function (stats) {
		if(stats['str'] + stats['siz'] <= 64) {
			stats['damageBonus'] = '-2';
			stats['build'] = -1;
		} else if(stats['str'] + stats['siz'] <= 84) {
			stats['damageBonus'] = '-1';
			stats['build'] = -1;
		} else if(stats['str'] + stats['siz'] <= 124) {
			stats['damageBonus'] = '-';
			stats['build'] = 0;
		} else if(stats['str'] + stats['siz'] <= 164) {
			stats['damageBonus'] = '+1D4';
			stats['build'] = 1;
		} else if(stats['str'] + stats['siz'] <= 204) {
			stats['damageBonus'] = '+1D6';
			stats['build'] = 2;
		} else {
			const multiplier = Math.floor((stats['str'] + stats['siz'] - 204) / 80);
			stats['damageBonus'] = `+${1 + multiplier}D6`;
			stats['build'] = 2 + multiplier;
		}

		stats['hitPoints'] = Math.floor((stats['con'] + stats['siz']) / 10);

		if(stats['dex'] < stats['siz'] && stats['str'] < stats['siz']) {
			stats['mov'] = 7;
		} else if((stats['dex'] < stats['siz'] && stats['str'] >= stats['siz']) ||
			(stats['dex'] >= stats['siz'] && stats['str'] < stats['siz']) ||
			(stats['dex'] === stats['siz'] && stats['str'] === stats['siz'])
		) {
			stats['mov'] = 8;
		} else {
			stats['mov'] = 9;
		}

		return stats;
	}
};
