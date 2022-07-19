all: serve

setup:
	npm install

serve: setup
	clear
	npm run serve

buildProject:
	npm run build

build: buildProject
	sed -i 's/src="\//src=".\//g' ../frontend-build/index.html
	sed -i 's/href="\//href=".\//g' ../frontend-build/index.html

lint:
	npm run lint

clean:
	rm -rf ../frontend-build/ ./node_modules/ ./package-lock.json

archive:
ifdef branch
	@printf 'archiving branch: $(branch)\n'
	@printf '\n\nPulling...\n'
	git pull
	@printf '\n\nChecking out branch...\n'
	git checkout $(branch)
	@printf '\n\nSwitching back to main...\n'
	git checkout main
	@printf '\n\nApplying archive tag to $(branch)...\n'
	git tag archive/$(branch) $(branch)
	@printf '\n\ndeleting local copy of $(branch)...\n'
	git branch -D $(branch)
	@printf '\n\ndeleting remote copy of $(branch)...\n'
	git branch -d -r origin/$(branch)
	@printf '\n\npushing the archive tagged version of the branch to remote $(branch)...\n'
	git push --tags
	@printf '\n\nfinal push to origin $(branch)...\n'
	git push origin :$(branch)
else
	@printf 'no branch specified. \n\n'
	@printf 'usage: make archive branch=<branch_name>\n'
endif