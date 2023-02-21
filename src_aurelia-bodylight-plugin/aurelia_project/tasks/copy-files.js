import gulp from 'gulp';
import path from 'path';
import minimatch from 'minimatch';
import project from '../aurelia.json';

export default function copyFiles(done) {
  if (typeof project.build.copyFiles !== 'object') {
    done();
    return;
  }

  const instruction = getNormalizedInstruction();
  const files = Object.keys(instruction);
  //console.log('copyfiles files:',files);
  //console.log('instructions:',instruction)
  //tomas add multiple source and dest
  /*let a;
  files.forEach(item => {
    console.log('copyfiles item:',item);
    a = gulp.src(item, {since: gulp.lastRun(copyFiles)})
        .pipe(gulp.dest(x => {
          const filePath = prepareFilePath(x.path);
          const key = files.find(f => minimatch(filePath, f));
          console.log('dest item, key instruction[key]',item, key,instruction[key]);
          return instruction[key];
        }));
  })
  return a;

   */
  return gulp.src(files, {since: gulp.lastRun(copyFiles)})
    .pipe(gulp.dest(x => {
      const filePath = prepareFilePath(x.path);
      const key = files.find(f => minimatch(filePath, f));
      return instruction[key];
    }));
}

function getNormalizedInstruction() {
  const files = project.build.copyFiles;
  let normalizedInstruction = {};

  for (let key in files) {
    normalizedInstruction[path.posix.normalize(key)] = files[key];
  }

  return normalizedInstruction;
}

function prepareFilePath(filePath) {
  let preparedPath = filePath.replace(process.cwd(), '').slice(1);

  //if we are running on windows we have to fix the path
  if (/^win/.test(process.platform)) {
    preparedPath = preparedPath.replace(/\\/g, '/');
  }

  return preparedPath;
}
