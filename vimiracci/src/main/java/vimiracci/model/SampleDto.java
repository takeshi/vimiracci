package vimiracci.model;

import org.springframework.web.multipart.MultipartFile;

public class SampleDto {
	MultipartFile file;

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

}
