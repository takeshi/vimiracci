package vimiracci.model;

import javax.persistence.Id;

import com.googlecode.objectify.annotation.Entity;

@Entity
public class Item {
	@Id
	private Long key;

	private String name;

	public Long getKey() {
		return key;
	}

	public void setKey(Long key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
