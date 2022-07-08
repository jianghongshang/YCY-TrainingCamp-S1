class BrakeBanner {
	constructor(selector) {
		// 初始化pixi应用
		this.app = new PIXI.Application({
			with: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0xffffff,
			resizeTo: window
		})

		document.querySelector(selector).appendChild(this.app.view)

		this.stage = this.app.stage;
		// 创建加载器
		this.loader = new PIXI.Loader();
		// 使用加载器
		this.loader.add("btn.png", "images/btn.png");
		this.loader.add("btn_circle.png", "images/btn_circle.png");
		this.loader.add("brake_bike.png", "images/brake_bike.png");
		// 刹车的把手
		this.loader.add("brake_handlerbar.png", "images/brake_handlerbar.png");
		this.loader.add("brake_lever.png", "images/brake_lever.png");
		this.loader.load();


		// 取资源
		this.loader.onComplete.add(() => {
			this.show()
		})
	}
	show() {
		let actionButton = this.createActionButton();
		// actionButton.x = actionButton.y = 400
		actionButton.x = actionButton.y = 400

		const bikeContainer = new PIXI.Container();
		bikeContainer.scale.x = bikeContainer.scale.y = 0.3;
		this.stage.addChild(bikeContainer)
		const bikeImage = new PIXI.Sprite(this.loader.resources["brake_bike.png"].texture)
		bikeContainer.addChild(bikeImage)

		const bikeLeverImage = new PIXI.Sprite(this.loader.resources["brake_lever.png"].texture)
		bikeContainer.addChild(bikeLeverImage)
		bikeLeverImage.pivot.x = bikeLeverImage.pivot.y = 455

		bikeLeverImage.x = 722
		bikeLeverImage.y = 900

		const bikeHandlerbarImage = new PIXI.Sprite(this.loader.resources["brake_handlerbar.png"].texture)
		bikeContainer.addChild(bikeHandlerbarImage)




		this.stage.addChild(actionButton)
		actionButton.interactive = true;
		actionButton.buttonMode = true;
		actionButton.on("mousedown", () => {
			// bikeLeverImage.rotation = Math.PI / 180 * -30
			gsap.to(bikeLeverImage, { duration: 0.6, rotation: Math.PI / 180 * -30 })
			pause();
		})
		actionButton.on("mouseup", () => {
			console.log(gsap, "aaaaaaaaaaa")
			// bikeLeverImage.rotation = 0
			gsap.to(bikeLeverImage, { duration: 0.6, rotation: 0 })
			start();
		})

		let resize = () => {
			bikeContainer.x = window.innerWidth - bikeContainer.width;
			bikeContainer.y = window.innerHeight - bikeContainer.height;
		}
		window.addEventListener("resize", resize)
		resize()

		// 创建粒子
		let particleContainer = new PIXI.Container();
		this.stage.addChild(particleContainer)
		particleContainer.pivot.x = window.innerWidth / 2;
		particleContainer.pivot.y = window.innerHeight / 2;

		particleContainer.x = window.innerWidth / 2;
		particleContainer.y = window.innerHeight / 2;

		particleContainer.rotation = 35 * Math.PI / 180
		let praticles = [];
		let colors = [0xf1cf54, 0xb5cea8, 0xf1cf54];
		for (let i = 0; i < 20; i++) {
			let gr = new PIXI.Graphics();

			gr.beginFill(colors[Math.floor(Math.random() * colors.length)]);

			gr.drawCircle(0, 0, 6);

			gr.endFill();
			let pItem = {
				sx: Math.random() * window.innerWidth,
				sy: Math.random() * window.innerHeight,
				gr: gr
			}
			gr.x = pItem.sx;
			gr.y = pItem.sy;
			particleContainer.addChild(gr)
			praticles.push(pItem)
		}

		let speed = 0;
		function loop() {
			speed += .5
			speed = Math.min(speed, 20)
			for (let i = 0; i < praticles.length; i++) {
				let pItem = praticles[i];
				pItem.gr.y += speed
				if (speed >= 20) {
					pItem.gr.scale.y = 40;
					pItem.gr.scale.x = 0.03
				}
				if (pItem.gr.y > window.innerHeight) {
					pItem.gr.y = 0
				}
			}
		}
		function start() {
			speed = 0;
			gsap.ticker.add(loop);
		}
		function pause() {
			gsap.ticker.remove(loop);
			for (let i = 0; i < praticles.length; i++) {
				let pItem = praticles[i];
				pItem.gr.scale.y = 1;
				pItem.gr.scale.x = 1
				gsap.to(pItem.gr, { duration: 0.6, x: pItem.sx, y: pItem.sy, ease: "elastic.out" })
			}
		}
		start();


		// 粒子有多种颜色
		// 向某一个角度持续移动
		// 超出了边界之后回到顶部继续移动
		// 按住鼠标停止
		// 停止的时候有一点回弹的效果
		// 松开鼠标继续

	}
	createActionButton() {
		// 创建一个资源容器
		let actionButton = new PIXI.Container();
		let btnImage = new PIXI.Sprite(this.loader.resources["btn.png"].texture)
		actionButton.addChild(btnImage)

		// 按钮周围的圆圈
		let btnCircle = new PIXI.Sprite(this.loader.resources["btn_circle.png"].texture)
		actionButton.addChild(btnCircle)

		let btnCircle2 = new PIXI.Sprite(this.loader.resources["btn_circle.png"].texture)
		actionButton.addChild(btnCircle2)
		btnImage.pivot.x = btnImage.width / 2;
		btnImage.pivot.y = btnImage.height / 2;
		btnCircle.pivot.x = btnCircle.pivot.y = btnCircle.width / 2;
		btnCircle2.pivot.x = btnCircle2.pivot.y = btnCircle2.width / 2;
		// btnImage.pivot.y = btnImage.height / 2;

		btnCircle.scale.x = btnCircle.scale.y = 0.8;
		// btnCircle2.scale.x = btnCircle2.scale.y =1.2;
		gsap.to(btnCircle.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 });
		gsap.to(btnCircle, { duration: 1, alpha: 0, repeat: -1 })
		return actionButton
	}
}




