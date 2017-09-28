class Vue{
	constructor(options){
		this.$el=options.el;
		console.log(options)
		this.$data=options.data;
		this.textReg=/{{(.+?)}}/g
		this.renderProp={} //定义对象
		this.interatorNodes();
	}
	//解析dom
	interatorNodes(node=this.$el){
		node =typeof node === 'string'? document.querySelector(node):node
		Array.from(node.childNodes).forEach(node =>{
			this.nodeType(node)
			if(node.childNodes.length){
				this.interatorNodes(node)
			}
		})
	}
	//判断node节点类型
	nodeType(node){
		if(node.nodeType===1){

		}
		if(node.nodeType===3){
			this.mustache(node)
		}
	}
	//mustache渲染
	mustache(node){
		let text=node.textContent
		if(this.textReg.test(text)){
			//保留模板
			node.template=text
			node.textContent=this.templateRender(text)
			console.log(node)
			this.coupling(text.split(this.textReg)[1],node)
		}
	}
	//模板渲染
	templateRender(template){
		return template.replace(this.textReg,(match,p1)=>{
			return this.$data[p1]
		})
	}
	//绑定dom
	coupling(prop,node){
		if(this.renderProp[prop]===undefined){

			this.renderProp[prop]=[]
			//监听数据变化，重新渲染dom
			this.monitorBindingData(prop)
		}
		this.renderProp[prop].push(node)
	}
	//监听数据变化
	monitorBindingData(prop){
		let initialization=this.$data[prop]
		let self=this
		Object.defineProperty(this.$data,prop,{
			get(){
				return initialization
			},
			set(value){
				initialization=value
				self.model2view(prop)
			}
		})
	}

	model2view(prop){
		let renderProp=this.renderProp[prop]
		if(renderProp &&renderProp.length){
			renderProp.forEach((node,index)=>{
				if(node.nodeType===1){

				}
				if(node.nodeType===3){
					node.textContent=this.templateRender(node.template)
				}
			})
		}
	}

}

let app=new Vue({
	el:'#tabs',
	data:{
		pName:'hhhhhhhhh'
	}
})