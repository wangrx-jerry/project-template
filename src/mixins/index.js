export default {
	/* install () {
		Vue.mixin({
			methods: {
				handleSizeChange (val) {
					this.getParams.PageSize = val;
					this.getPageData();
				},
				handleCurrentChange (val) {
					this.getParams.PageIndex = val;
					this.getPageData();
				}
			}
		});
    } */
	methods: {
		handleSizeChange (val) {
			this.getParams.PageSize = val;
			this.getPageData();
		},
		handleCurrentChange (val) {
			this.getParams.PageIndex = val;
			this.getPageData();
		}
	}
};
